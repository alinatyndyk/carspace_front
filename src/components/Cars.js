import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CarCard from "./CarCard";
import {carActions} from "../redux";
import {useLocation, useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

const Cars = ({id}) => {
    const {cars, car, errors} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const {brand, description: desc} = useParams();
    const {state} = useLocation();
    console.log(state?.description, 'STATE DESC');
    const [searchParams, setSearchParams] = useSearchParams({page: 1});
    const [getPage, setPage] = useState({page:1});
    const [getDesc, setDesc] = useState();
    console.log(getDesc, 'getDesc');
    console.log(id, 'ID IN CARS');


    useEffect(() => {
        if (brand) {
            console.log('else if brand');
            console.log(searchParams, "SEARCH PARAMS BRAND***********");
            // const res = dispatch(carActions.getByBrand({brand}))
            const res = dispatch(carActions.getByBrand({brand}))
            console.log(res);
        } else if (id) {
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

            console.log(state?.location, 'LOCATION STATE 1');

    useEffect(() => {
        setSearchParams(searchParams);
        console.log(searchString, 'IMP');
        if (brand) {
            searchParams.set('brand', brand)
        }
        if (state?.description) {
            setDesc(state?.description);
            console.log(getDesc, 'get desc if');
            console.log(state?.description, 'in if ***********************');
            dispatch(carActions.getByDescription({description: state.description, params: getPage}))
        }else if (state?.location){
            console.log(state?.location, 'LOCATION STATE');
            searchParams.set('location', `${state?.location}`)
            // dispatch(carActions.getAllWithParams({params: }))

        }else if(getDesc?.description){
            dispatch(carActions.getByDescription({description: getDesc, params: getPage}))
        }else {
            console.log('INALL***************');
            dispatch(carActions.getAllWithParams({params: searchParams}))
        }
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
        console.log(page, "GET PAGE NEXT");
        page = +page + 1
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
            <button onClick={() => prevPage()}>prev</button>
            <button onClick={() => nextPage()}>next</button>
            {/*{id ? <div><CarCard key={id} car={car}/></div>*/}
            {/*    : null}*/}
        </div>
    );
};

export default Cars;
