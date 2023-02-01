import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CarCard from "./CarCard";
import {carActions} from "../redux";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

const Cars = ({id}) => {
    const {cars, car, errors} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const {brand, company_id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams({page: 1});
    const [getPage, setPage] = useState(1);
    const [getButtons, setButtons] = useState(false);
    const searchString = window.location.search;


    useEffect(() => {
        if (brand) {
            const {errors} = dispatch(carActions.getAllWithParams({params: searchParams}));
            console.log(errors);
        } else if (id) {
            dispatch(carActions.getById({_id: id}));
        } else if (searchString.includes('description') === true) {
            const {errors} = dispatch(carActions.getByDescription({
                description: {description: searchParams.get('description')},
                params: searchParams
            }));
            console.log(errors, 'errors');
        } else {
            const {errors} = dispatch(carActions.getAll())
            console.log(errors);
        }
        setSearchParams(searchParams);
    }, [id, company_id]);

    useEffect(() => {
        setSearchParams(searchParams);

        if (brand) {
            searchParams.set('brand', brand);
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
            const {errors} = dispatch(carActions.getAllWithParams({params: searchParams}));
            console.log(errors);
        }
        setSearchParams(searchParams);
    }, [getPage])


    const prevPage = () => {
        let page = searchParams.get('page');
        page = +page - 1
        searchParams.set('page', page)
        setPage(page);
    }

    const nextPage = () => {
        let page = searchParams.get('page');
        if (isNaN(page)) page = 1
        page = +page + 1
        searchParams.set('page', page)
        setPage(page);
    }

    if (id !== undefined) {
        return (
            <div>
                <CarCard car={car} id={id}/>
            </div>
        )
    }


    return (
        <div>
            {errors}
            {cars?.map(car => <CarCard key={car._id} car={car}/>)}
            <button onClick={() => prevPage()}>prev</button>
            <button disabled={getButtons} onClick={() => nextPage()}>next</button>
        </div>
    );
};

export default Cars;
