import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CarCard from "./CarCard";
import {carActions} from "../redux";
import {useLocation, useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

const Cars = ({id}) => {
    const {cars, car, errors} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const {brand} = useParams();
    const {state} = useLocation();
    const [searchParams, setSearchParams] = useSearchParams({page: 1});
    const [getPage, setPage] = useState(1);
    const [getNavigationButtons, setNavigationButtons] = useState(false);

    const searchString = window.location.search;

    useEffect(() => {
        if (brand) {
            const res = dispatch(carActions.getAllWithParams({params: searchParams}));
            console.log(res);
        } else if (id) {
            dispatch(carActions.getById({_id: id}));
        } else if (searchString.includes('description') === true) {
            const {errors} = dispatch(carActions.getByDescription({
                description: {description: searchParams.get('description')},
                params: searchParams
            }));
            console.log(errors, 'errors');
            if (errors?.response?.status === 404) {
                setNavigationButtons(true);
            }
        } else {
            const {errors} = dispatch(carActions.getAll())
            console.log(errors, 'if all cars');
        }
        setSearchParams(searchParams);
    }, [id]);

    useEffect(() => {
        setSearchParams(searchParams);
        if (brand) {
            searchParams.set('brand', brand)
        }
        if (searchString.includes('description') === true) {
            searchParams.set('page', getPage);
            setSearchParams(searchParams);
            const {errors} = dispatch(carActions.getByDescription({
                description: {description: searchParams.get('description')},
                params: searchParams
            }));
            console.log(errors);
        } else {
            console.log('INALL***************');
            const cars = dispatch(carActions.getAllWithParams({params: searchParams}));
            // const cars = dispatch(carActions.getAll());
            console.log(cars);
        }
        setSearchParams(searchParams);
    }, [getPage])


    const prevPage = () => {
        let page = searchParams.get('page');
        page = +page - 1
        console.log(page, "PREV PAGE");
        searchParams.set('page', page)
        setPage(page);
        // searchParams.set('page', getPage);
    }

    const nextPage = () => {
        let page = searchParams.get('page');
        console.log(page, "PAGE");
        if (isNaN(page)) page = 1
        // let page = getPage.page;
        page = +page + 1
        searchParams.set('page', page)
        setPage(page);
    }


    if (id !== undefined) {
        return (
            <div>
                single cra gape
                <CarCard car={car} id={id}/>

            </div>
        )
    }


    return (
        <div>
            {errors}
            {cars?.map(car => <CarCard key={car._id} car={car}/>)}
            {/*<button onClick={() => {setPage(getPage-1);searchParams.set('page', getPage);}}>prev</button>*/}
            {/*<button onClick={() => {setPage(getPage+1);searchParams.set('page', getPage);}}>next</button>*/}
            <button onClick={() => prevPage()}>prev</button>
            <button disabled={getNavigationButtons} onClick={() => nextPage()}>next</button>
            {/*{id ? <div><CarCard key={id} car={car}/></div>*/}
            {/*    : null}*/}
        </div>
    );
};

export default Cars;
