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
    const {brand, desc} = useParams();
    const {state} = useLocation();
    console.log(state, 'STATE DESC');
    const [searchParams, setSearchParams] = useSearchParams({page: 1});
    const [getPage, setPage] = useState(1);
    const [getDesc, setDesc] = useState(state);
    console.log(getDesc, 'getDesc');
    // console.log(id, 'ID IN CARS');

    const searchString = window.location.search;
    console.log(searchString, 'search string');

    useEffect(() => {
        if (brand) {
            console.log('else if brand');
            console.log(searchParams, "SEARCH PARAMS BRAND***********");
            // const res = dispatch(carActions.getByBrand({brand}));
            const res = dispatch(carActions.getByBrand({brand}));
            console.log(res);
        } else if (id) {
            console.log(id, 'if id cars');
            dispatch(carActions.getById({_id: id}))
            // console.log(car);
        }else if (searchString.includes('description') === true){
            const {errors} = dispatch(carActions.getByDescription({description: {description: searchParams.get('desc')}, params: searchParams}));
            console.log(errors, 'errors');
            searchParams.set('if_id', "true");
        }else {
            console.log(id, 'if all cars');
            const {errors} = dispatch(carActions.getAll())
            console.log(errors, 'if all cars');
        }
        setSearchParams(searchParams);
    }, [id]);


            // console.log(state?.location, 'LOCATION STATE 1');

    useEffect(() => {
        // console.log('GET PAGE ***************/*/*/*/*//**********');
        setSearchParams(searchParams);
        // console.log(searchString, 'IMP');
        // console.log(searchString.includes('desc'));
        if (brand) {
            searchParams.set('brand', brand)
        }
        if (searchString.includes('description') === true) {
            searchParams.set('page', getPage);
            setSearchParams(searchParams);
            console.log(searchParams, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            // const {errors} = dispatch(carActions.getByDescription({description: {description: "Bentley"}, params: searchParams}));
            const {errors} = dispatch(carActions.getByDescription({description: {description: searchParams.get('description')}, params: searchParams}));
            // const {errors} = dispatch(carActions.getAllWithParams({params: searchParams}));
            console.log(errors);
            searchParams.set('change_page', "true");
            // history.push(`/cars/${searchParams.toString()}/xxx`)
        }else {
            console.log('INALL***************');
            dispatch(carActions.getAllWithParams({params: searchParams}))
        }
            setSearchParams(searchParams);
    }, [getPage])
    console.log(searchParams.toString(), '****-*---------*-*-***********');


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
        if(isNaN(page)) page = 1
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
            <button onClick={() => nextPage()}>next</button>
            {/*{id ? <div><CarCard key={id} car={car}/></div>*/}
            {/*    : null}*/}
        </div>
    );
};

export default Cars;
