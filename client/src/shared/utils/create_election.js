import { post } from 'shared/utils'

const createElection = (user, onSuccess, onError) => {
  post('elections/create', { user: user.id })
    .then(({ election_id: id, status }) => {
      if (status === 200) {
        onSuccess(id)
      } else if (onError) onError()
    })
    .catch(() => {
      if (onError) onError()
    })
}

export default createElection
