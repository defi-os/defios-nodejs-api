import * as anchor from '@project-serum/anchor'
import { Defios } from '../type-file/defios'
import {
    IPullRequestSent,
    IAddCommitToPR,
    IAddChildObjectiveEvent,
    IAddObjectiveDataEvent,
    IAddRoadmapDataEvent,
    INameRouterCreated,
    IVerifiedUserAdded,
    ICommitAdded,
    IIssueCreated,
    IRepositoryCreated,
    IIssueStaked,
    IIssueUnstaked,
    IPullRequestAccepted,
    IVestingScheduleChanged,
    IDefaultVestingScheduleChanged,
    IPullRequestStaked,
    IPullRequestUnstaked,
} from './events'

import { commitCreated } from './handlers/commitCreated'
import { issueCreated } from './handlers/issueCreated'
import { issueStaked } from './handlers/issueStaked'
import { issueUnstaked } from './handlers/issueUnstaked'
import { repositoryCreated } from './handlers/repositoryCreated'
import { addVerifiedUser } from './handlers/verifiedUserAdded'
import { addObjectiveData } from './handlers/addObjectiveData'
import { addRoadmapData } from './handlers/addRoadmapData'
import { addChildObjective } from './handlers/addChildObjective'
import { addCommitToPR } from './handlers/addCommitToPR'
import { pullRequestSent } from './handlers/pullRequestSent'
import { pullRequestAccepted } from './handlers/pullRequestAccepted'
import { vestingScheduleChanged } from './handlers/vestingScheduleChanged'
import { defaultVestingScheduleChanged } from './handlers/defaultVestingScheduleChanged'
import { pullRequestStaked } from './handlers/pullRequestStaked'
import { pullRequestUnstaked } from './handlers/pullRequestUnstaked'
import { checkTransactionSignature } from './anchor_decorator/decorator'
export const addEventListener = (program: anchor.Program<Defios>) => {
    program.addEventListener(
        'VerifiedUserAdded',
        (res: IVerifiedUserAdded, _, signature) => {
            checkTransactionSignature(signature)
            addVerifiedUser(res)
                .then(() => {
                    console.log('VerifiedUserAdded')
                })
                .catch((e) => {
                    console.log('Error Adding User: ', e)
                })
        }
    )

    program.addEventListener(
        'CommitAdded',
        (res: ICommitAdded, _, signature) => {
            checkTransactionSignature(signature)
            commitCreated(res)
                .then(() => {
                    console.log('CommitAdded')
                })
                .catch((e) => {
                    console.log('Error Adding Commit: ', e)
                })
        }
    )

    program.addEventListener(
        'IssueCreated',
        (res: IIssueCreated, _, signature) => {
            checkTransactionSignature(signature)
            issueCreated(res)
                .then(() => {
                    console.log('IssueCreated')
                })
                .catch((e) => {
                    console.log('Error Adding Issue: ', e)
                })
        }
    )

    program.addEventListener(
        'RepositoryCreated',
        (res: IRepositoryCreated, _, signature) => {
            checkTransactionSignature(signature)
            repositoryCreated(res)
                .then(() => {
                    console.log('Repository Created')
                })
                .catch((e) => {
                    console.log('Error Adding Repo: ', e)
                })
        }
    )

    program.addEventListener(
        'IssueStaked',
        (res: IIssueStaked, _, signature) => {
            checkTransactionSignature(signature)
            issueStaked(res)
                .then(() => {
                    console.log('IssueStaked')
                })
                .catch((e) => {
                    console.log('Error Adding Stake: ', e)
                })
        }
    )

    program.addEventListener(
        'IssueUnstaked',
        (res: IIssueUnstaked, _, signature) => {
            checkTransactionSignature(signature)
            issueUnstaked(res)
                .then(() => {
                    console.log('IssueUnstaked')
                })
                .catch((e) => {
                    console.log('Error Adding Stake: ', e)
                })
        }
    )

    //New Listeners
    program.addEventListener(
        'AddObjectiveDataEvent',
        (res: IAddObjectiveDataEvent, _, signature) => {
            checkTransactionSignature(signature)
            addObjectiveData(res)
                .then(() => {
                    console.log('ObjectiveDataAdded')
                })
                .catch((e) => {
                    console.log('Error Adding Objective Data: ', e)
                })
        }
    )

    program.addEventListener(
        'AddRoadmapDataEvent',
        (res: IAddRoadmapDataEvent, _, signature) => {
            checkTransactionSignature(signature)
            addRoadmapData(res)
                .then(() => {
                    console.log('RoadmapDataAdded')
                })
                .catch((e) => {
                    console.log('Error Adding Roadmap Data: ', e)
                })
        }
    )

    program.addEventListener(
        'AddChildObjectiveEvent',
        (res: IAddChildObjectiveEvent, _, signature) => {
            checkTransactionSignature(signature)
            addChildObjective(res)
                .then(() => {
                    console.log('ChildObjectiveAdded')
                })
                .catch((e) => {
                    console.log('Error Adding Child Objective: ', e)
                })
        }
    )

    program.addEventListener(
        'PullRequestSent',
        (res: IPullRequestSent, _, signature) => {
            checkTransactionSignature(signature)
            pullRequestSent(res)
                .then(() => {
                    console.log('PullRequestSent')
                })
                .catch((e) => {
                    console.log('Error Adding Pull Request: ', e)
                })
        }
    )

    program.addEventListener(
        'CommitAddedToPullRequest',
        (res: IAddCommitToPR, _, signature) => {
            checkTransactionSignature(signature)
            addCommitToPR(res)
                .then(() => {
                    console.log('CommitAddedToPullRequest')
                })
                .catch((e) => {
                    console.log('Error Adding Commit to Pull Request: ', e)
                })
        }
    )

    program.addEventListener(
        'PullRequestAccepted',
        (res: IPullRequestAccepted, _, signature) => {
            checkTransactionSignature(signature)
            pullRequestAccepted(res)
                .then(() => {
                    console.log('PullRequestAccepted')
                })
                .catch((e) => {
                    console.log('Error Accepting Pull Request: ', e)
                })
        }
    )

    program.addEventListener(
        'VestingScheduleChanged',
        (res: IVestingScheduleChanged, _, signature) => {
            checkTransactionSignature(signature)
            vestingScheduleChanged(res)
                .then(() => {
                    console.log('VestingScheduleChanged')
                })
                .catch((e) => {
                    console.log('Error Changing Vesting Schedule: ', e)
                })
        }
    )

    program.addEventListener(
        'DefaultVestingScheduleChanged',
        (res: IDefaultVestingScheduleChanged, _, signature) => {
            checkTransactionSignature(signature)
            defaultVestingScheduleChanged(res)
                .then(() => {
                    console.log('DefaultVestingScheduleChanged')
                })
                .catch((e) => {
                    console.log('Error Changing Default Vesting Schedule: ', e)
                })
        }
    )

    program.addEventListener(
        'PullRequestStaked',
        (res: IPullRequestStaked, _, signature) => {
            checkTransactionSignature(signature)
            pullRequestStaked(res)
                .then(() => {
                    console.log('PullRequestStaked')
                })
                .catch((e) => {
                    console.log('Error Staking Pull Request: ', e)
                })
        }
    )

    program.addEventListener(
        'PullRequestUnstaked',
        (res: IPullRequestUnstaked, _, signature) => {
            checkTransactionSignature(signature)
            pullRequestUnstaked(res)
                .then(() => {
                    console.log('PullRequestUnstaked')
                })
                .catch((e) => {
                    console.log('Error Unstaking Pull Request ', e)
                })
        }
    )

    console.log('Listeners Added')
}
