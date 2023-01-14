import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CarCard from "./CarCard";
import {carActions} from "../redux";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

const Cars = ({id}) => {
    const {cars, car, errors} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const {brand} = useParams();
    const [searchParams, setSearchParams] = useSearchParams({page: 1});
    const [getPage, setPage] = useState();
    console.log(id, 'ID IN CARS');


    useEffect(() => {
        if (brand) {
            console.log('else if brand');
            console.log(searchParams, "SEARCH PARAMS BRAND***********");
            // const res = dispatch(carActions.getByBrand({brand}))
            const res = dispatch(carActions.getByBrand({brand}))
            console.log(res);
        } else
        if (id) {
            console.log(id, 'if id cars');
            dispatch(carActions.getById({_id: id}))
            // console.log(car);
        } else {
            console.log(id, 'if all cars');
            const {errors} = dispatch(carActions.getAll())
            console.log(errors, 'if all cars');
        }
            setSearchParams(searchParams);
    }, [id]);

    const searchString = window.location.search;
    console.log(searchString, 'search string');


    useEffect(() => {
        setSearchParams(searchParams);
        console.log(searchString, 'IMP');
        let params;

        if(brand){searchParams.set('brand', brand)}
        dispatch(carActions.getAllWithParams({params: searchParams}))
    },[getPage])


    const prevPage = () => {
        let page = searchParams.get('page');
        page = +page -1
        console.log(page, "PREV PAGE");
        searchParams.set('page', page)
        setPage(page);
        // searchParams.set('page', getPage);
    }

    const nextPage = () => {
        let page = searchParams.get('page');
        console.log(page, "GET PAGE NEXT");
        page = +page +1
        console.log(page, "GET PAGE NEXT AFTER +");
        // console.log(page, "next PAGE");
        searchParams.set('page', page)
        setPage(page);
        // searchParams.set('page', getPage);
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
            <button onClick={ () => prevPage()}>prev</button>
            <button onClick={nextPage}>next</button>
            {/*{id ? <div><CarCard key={id} car={car}/></div>*/}
            {/*    : null}*/}
        </div>
    );
};

export default Cars;
