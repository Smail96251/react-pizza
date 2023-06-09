export const Categories = ({ indexCategory, setIndexCategory }) => {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];
	return (
		<div className='categories'>
			<ul>
				{categories.map((value, index) => (
					<li
						key={index}
						onClick={() => setIndexCategory(index)}
						className={indexCategory === index ? 'active' : ''}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
};
