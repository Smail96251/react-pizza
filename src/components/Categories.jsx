import { useState } from 'react';

export const Categories = () => {
	const [indexCategory, setIndexCategory] = useState(0);

	const activeCategory = index => {
		setIndexCategory(index);
	};

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
						onClick={() => activeCategory(index)}
						className={indexCategory === index ? 'active' : ''}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
};
