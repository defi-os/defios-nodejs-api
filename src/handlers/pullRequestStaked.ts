import { IPullRequestStaked } from '../events'
import { Issues } from '../models/issues'
import { User } from '../models/users'

export const pullRequestStaked = async (res: IPullRequestStaked) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                user_phantom_address: res.prStaker.toString(),
            })
            if (!user) {
                reject('User not found')
                return
            }
            const issue = await Issues.findOne({
                'issue_prs.issue_pr_account': res.prAccount,
            })
            if (!issue) {
                reject('issue not found')
                return
            }
            const updatedPR = issue.issue_prs.map((item) => {
                if (
                    item.issue_pr_account.toString() !==
                    res.prAccount.toString()
                ) {
                    return item
                } else {
                    item.issue_vote_amount =
                        res.stakedAmount.toNumber() + item.issue_vote_amount
                    return item
                }
            })
            issue.issue_prs = updatedPR
            issue.save()
            user.user_contributions.push({
                contributor_github: user.user_github,
                contribution_link: res.prContributionLink,
                contribution_timestamp: new Date(),
                contribution_amt: res.stakedAmount.toNumber(),
                contribution_token_symbol: issue.issue_stake_token_symbol,
                contribution_token_url: issue.issue_stake_token_url,
                contribution_type: 'outbound',
                contributor_project_id: issue.issue_project_id,
                contributor_project_name: issue.issue_project_name,
            })
            user.save()
            resolve('Staked on PR Successfully')
        } catch (err) {
            reject(err)
        }
    })
}
