import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Sceleton';
import { PizzaBlock } from '../components/PizzaBlock';
import { useEffect, useState } from 'react';

export const Home = () => {
	const [itemsPizza, setItemsPizza] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://64625dc44dca1a6613449bc0.mockapi.io/items')
			.then(res => {
				return res.json();
			})
			.then(json => {
				setItemsPizza(json);
				setLoading(false);
			});
	}, []);

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: itemsPizza.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</>
	);
};
