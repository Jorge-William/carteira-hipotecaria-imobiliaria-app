import { useMemo } from 'react'

export const DOTS = '...'

const range = (start, end) => {
	let length = end - start + 1
	return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage
}) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize)

		// A contagem de páginas é determinada com siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		const totalPageNumbers = siblingCount + 5

		/*
        Caso 1:
        Se o número de páginas for inferior aos números das páginas que queremos exibir em nosso paginationComponent, retornamos o intervalo [1..totalPageCount]
      */
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount)
		}

		/*
          Calcular o índice irmão à esquerda e à direita e garantir que eles estão dentro do intervalo entre 1 e totalPageCount
      */
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount
		)

		/*
        Não mostramos pontos apenas quando há apenas um número de página a ser inseridos entre os extremos dos irmãos e os limites das páginas, ou seja, 1 e totalPageCount. Assim, estamos usando leftSiblingIndex > 2 e rightSiblingIndex < totalPageCount - 2
      */
		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

		const firstPageIndex = 1
		const lastPageIndex = totalPageCount

		/*
          Caso 2: Não há pontos à esquerda para serem exibidos, mas pontos à direita para exibir
      */
		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount
			let leftRange = range(1, leftItemCount)

			return [...leftRange, DOTS, totalPageCount]
		}

		/*
          Caso 3: Não há pontos à direita para serem exibidos, mas pontos à esquerda para exibir
      */
		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		/*
          Caso 4: Pontos à esquerda e à direita para exibir
      */
		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [totalCount, pageSize, siblingCount, currentPage])

	return paginationRange
}
