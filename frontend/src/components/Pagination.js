import React from 'react'
import classnames from 'classnames'

import { usePagination, DOTS } from '../hooks/usePagination'
const Pagination = (props) => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 2,
		currentPage,
		pageSize,
		className
	} = props

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize
	})

	// Se houver menos que 2 vezes no intervalo de paginação, não renderizamos o componente
	if (currentPage === 0 || paginationRange.length < 2) {
		return null
	}

	const onNext = () => {
		onPageChange(currentPage + 1)
	}

	const onPrevious = () => {
		onPageChange(currentPage - 1)
	}

	let lastPage = paginationRange[paginationRange.length - 1]
	return (
		<ul
			className={classnames('pagination-container', {
				[className]: className
			})}
		>
			{/* Seta de navegação da esquerda */}
			<li
				className={classnames('pagination-item', {
					disabled: currentPage === 1
				})}
				onClick={onPrevious}
			>
				<div className='arrow left' />
			</li>
			{paginationRange.map((pageNumber, key) => {
				// Se o pageItem for um PONTO (DOT), renderize o caractere unicode DOTS
				if (pageNumber === DOTS) {
					return (
						<li key={key} className='pagination-item dots'>
							&#8230;
						</li>
					)
				}

				// Renderize a amostra de página
				return (
					<li key={key}
						className={classnames('pagination-item', {
							selected: pageNumber === currentPage
						})}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				)
			})}
			{/*  Seta de navegação da direita */}
			<li 
				className={classnames('pagination-item', {
					disabled: currentPage === lastPage
				})}
				onClick={onNext}
			>
				<div className='arrow right' />
			</li>
		</ul>
	)
}

export default Pagination
