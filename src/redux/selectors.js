
import { createSelector } from 'reselect'

const selectContractGraphs = state => state.graphs.contracts

export const selectConstructorNodes = createSelector(
  [selectContractGraphs],
  (contractGraphs) =>
    Object.entries(contractGraphs)
      .reduce((acc, [id, graph]) => {
        acc[id] = {
          id,
          contractName: graph.contractName(),
          inputs: graph.inputNodes(graph.constructorNodeId()),
        }
        return acc
      }, {})
)
