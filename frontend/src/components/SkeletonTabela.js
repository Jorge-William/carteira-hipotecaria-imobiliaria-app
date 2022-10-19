import Skeleton from 'react-loading-skeleton'

const SkeletonTabela = () => {
	return (
		<div>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>

						<th
							scope='col'
							data-bs-toggle='tooltip'
							data-bs-placement='top'
							title='Escritura'
						>
							<Skeleton count={1} height={25} />
						</th>
						<th
							scope='col'
							data-bs-toggle='tooltip'
							data-bs-placement='top'
							title='Hipoteca'
						>
							<Skeleton count={1} height={25} />
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope='row'>
							<Skeleton count={15} height={25} />
						</th>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default SkeletonTabela
