import { IRepositoryCreated } from '../events'
import { Project } from '../models/project'
import { Token } from '../models/token'
import { User } from '../models/users'
import axios from 'axios'

export const repositoryCreated = async (res: IRepositoryCreated) => {
    return new Promise(async (resolve, reject) => {
        try {
            axios
                .get(res.token_metadata_uri.toString())
                .then(async (response) => {
                    const tokenAddress = res.rewards_mint
                    const token = new Token({
                        token_spl_addr: tokenAddress.toBase58(),
                        token_symbol: response.data.symbol,
                        token_name: res.token_name,
                        token_image_url: res.token_image,
                    })
                    token.save()
                    const user = await User.findOne({
                        user_phantom_address: res.repository_creator.toString(),
                    })
                    if (!user) {
                        reject('User not found')
                        return
                    }
                    const project = new Project({
                        project_account: res.repository_account.toString(),
                        project_name: res.name,
                        num_contributions: 0,
                        num_contributions_chg_perc: 0,
                        num_open_issues: 0,
                        community_health: 0,
                        project_repo_link: res.uri,
                        project_token: token._id,
                        project_owner_github: user.user_github,
                    })
                    project.save()
                    resolve('Repository Creation Successfull')
                })
                .catch((err) => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}
