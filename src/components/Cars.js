import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CarCard from "./CarCard";
import {carActions} from "../redux";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

const Cars = ({id, accountCompanyId}) => {
    const {cars, car, errors} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const {brand, location, company_id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [getPage, setPage] = useState(1);

    const [geterror, seterror] = useState(null);
    const [getButtons, setButtons] = useState(false);
    const [getNextButtons, setNextButtons] = useState(false);
    const searchString = window.location.search;

    useEffect(() => {
        seterror(null);
        const navPage = searchParams.get('page')
        setPage(navPage);
        setNextButtons(false);
        if(!navPage){
            searchParams.set('page', 1);
        }
        if (getPage === 1) {
            setButtons(true);
        } else {
            setButtons(false);
        }
    }, [window.location.search])

    useEffect(() => {
        if (id) {
            dispatch(carActions.getById({_id: id}));

        } else if (company_id) {
            searchParams.set('company', company_id);
            dispatch(carActions.getAllWithParams({params: searchParams}));

        } else if (accountCompanyId) {
            searchParams.set('company', accountCompanyId);
            dispatch(carActions.getAllWithParams({params: {...searchParams}}));
        }

        setSearchParams(searchParams);
    }, [id, company_id]);

    useEffect(() => {
        setSearchParams(searchParams);

        if (brand) {
            searchParams.set('brand', brand);
        }

        if (location) {
            searchParams.set('location', location);
        }

        if (searchString.includes('from_date') === true) {
            searchParams.set('page', getPage);
            const promise1 = Promise.resolve(dispatch(carActions.getFilteredByDate({
                info: {
                    page: searchParams.get('page'),
                    from_date: searchParams.get('from_date'),
                    to_date: searchParams.get('to_date'),
                    description: searchParams.get('description'),
                    kiki: 'koko'
                }
            })))
            promise1.then((value) => {
                if (!value.payload[0]) {
                    throw new Error('No more cars with this parameters');
                }
                if (value.error) {
                    throw new Error(value.payload + ' in catch');
                }
            }).catch((error) => {
                seterror(error.message);
                setNextButtons(true);
            })
        } else if (searchString.includes('description') === true) {
            searchParams.set('page', getPage);
            setSearchParams(searchParams);
            const promise1 = Promise.resolve(dispatch(carActions.getByDescription({
                description: {description: searchParams.get('description')},
                params: searchParams
            })));
            promise1.then((value) => {
                if (value.error) {
                    throw new Error(value.payload + ' in catch');
                }
            }).catch((error) => {
                seterror(error.message);
                setNextButtons(true);
            })
        } else if (brand) {
            const promise1 = Promise.resolve(dispatch(carActions.getAllWithParams({
                params: searchParams,
                page: getPage
            })));
            promise1.then((value) => {
                if (value.error) {
                    throw new Error(value.payload + 'in catch');
                }
            }).catch((error) => {
                seterror(error.message);
                if (getPage !== 1) {
                    setNextButtons(true);
                }
            });
        } else if (location) {
            const promise1 = Promise.resolve(dispatch(carActions.getAllWithParams({
                params: searchParams,
                page: getPage
            })));
            promise1.then((value) => {
                if (value.error) {
                    throw new Error(value.payload);
                }
            }).catch((error) => {
                seterror(error.message);
                setNextButtons(true);
            });
        } else {
            const promise1 = Promise.resolve(dispatch(carActions.getAllWithParams({params: searchParams})));
            promise1.then((value) => {
                if (value.error) {
                    throw new Error(value.payload);
                }
            }).catch((error) => {
                seterror(error.message);
                setNextButtons(true);
            });
        }
        setSearchParams(searchParams);
    }, [getPage])

    useEffect(() => {
        setPage(1);
    }, [location, brand])


    const prevPage = () => {
        let page = searchParams.get('page');
        page = +page - 1
        searchParams.set('page', page)
        setPage(page);
        setNextButtons(false);
    }

    const nextPage = () => {
        let page = searchParams.get('page');
        page = +page + 1
        searchParams.set('page', page);
        setPage(page);
    }

    return (
        <div className={'cars'}>
            <div>{errors}</div>
            <div>{geterror !== null ? geterror : null}</div>
            {cars?.map(car => <CarCard key={car._id} car={car}/>)}
            <button disabled={getButtons} onClick={() => prevPage()}>prev</button>
            <button disabled={getNextButtons} onClick={() => nextPage()}>next</button>
        </div>
    );
};

export default Cars;
