import Skeleton from 'react-loading-skeleton'
export function SkeletonEditarMutuario() {
	return (
		<section className='mt-5'>
			<div className='mb-2'>
				<Skeleton count={1} height={30} width={150} />
			</div>
			<div className='row'>
				<div className='col-md-5'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-2'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-2'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-3'>
					<Skeleton count={1} height={30} />
				</div>
			</div>
			<div className='row mt-4'>
				<div className='col-md-1 mb-2'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-3'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-2'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-1'>
					<Skeleton count={1} height={30} />
				</div>
			</div>
			<div className='row mt-2'>
				{' '}
				<div className='col-md-3'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-2'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-1'>
					<Skeleton count={1} height={30} />
				</div>
				<div className='col-md-4'>
					<Skeleton count={1} height={30} />
				</div>
			</div>
		</section>
	)
}
