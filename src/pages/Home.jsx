import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Sceleton';
import { PizzaBlock } from '../components/PizzaBlock';
import { useContext, useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { AppContext } from '../App';

export const Home = () => {
	const { searchValue } = useContext(AppContext);
	const [itemsPizza, setItemsPizza] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [indexCategory, setIndexCategory] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeElementSort, setActiveElementSort] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	});

	useEffect(() => {
		setLoading(true);

		const order = activeElementSort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = activeElementSort.sortProperty.replace('-', '');
		const category = indexCategory > 0 ? `category=${indexCategory}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(
			`https://64625dc44dca1a6613449bc0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then(res => {
				return res.json();
			})
			.then(json => {
				setItemsPizza(json);
				setLoading(false);
			});
		window.scroll(0, 0);
	}, [indexCategory, activeElementSort, searchValue, currentPage]);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					indexCategory={indexCategory}
					setIndexCategory={index => setIndexCategory(index)}
				/>
				<Sort
					activeElementSort={activeElementSort}
					setActiveElementSort={setActiveElementSort}
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: itemsPizza.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
			<Pagination setCurrentPage={i => setCurrentPage(i)} />
		</div>
	);
};
