import arrayMove from 'array-move'

export function create(answers, { answer, newIndex }) {
  answers.splice(newIndex, 0, answer)

  return answers.filter(answer => answer)
}

export function update(answers, { answer, index, newIndex }) {
  answers[index] = answer
  arrayMove.mutate(answers, index, newIndex)

  return answers.filter(answer => answer)
}

export function remove(answers, { index }) {
  answers.splice(index, 1)

  return answers
}
