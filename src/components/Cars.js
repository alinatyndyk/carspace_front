import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CarCard from "./CarCard";
import {carActions} from "../redux";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

const Cars = ({id, accountCompanyId}) => {
    const {cars, errors} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const {brand, location, company_id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [getPage, setPage] = useState(1);

    const [geterror, seterror] = useState(null);
    const [getButtons, setButtons] = useState(true);
    const [getNextButtons, setNextButtons] = useState(false);
    const searchString = window.location.search;

    useEffect(() => {
        seterror(null);
        const navPage = searchParams.get('page');
        if (navPage === '1') {
            setButtons(true);
        }
        if (!navPage) {
            searchParams.set('page', 1);
            setButtons(true);
        }

        setNextButtons(false);
    }, [window.location.search, searchParams])

    useEffect(() => {
        if (id) {
            dispatch(carActions.getById({_id: id}));

        } else if (company_id) {
            searchParams.set('company', company_id);
            console.log('here');
            dispatch(carActions.getAllWithParams({params: {...searchParams}}));

        }

        setSearchParams(searchParams);
    }, [id, company_id, accountCompanyId]);

    useEffect(() => {
        setSearchParams(searchParams);

        if (brand) {
            searchParams.set('brand', brand);
        }

        if (location) {
            searchParams.set('location', location);
        }

        if (accountCompanyId) {
            searchParams.set('company', accountCompanyId);
            setSearchParams(searchParams);
            dispatch(carActions.getAllWithParams({params: {...searchParams}}));
            console.log('here');
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
                    throw new Error(value.payload);
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
                    throw new Error(value.payload);
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
                    throw new Error(value.payload);
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
    }, [getPage, geterror])

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
        setButtons(false);
        page = +page + 1
        searchParams.set('page', page);
        setPage(page);
    }

    return (
        <div className={'cars'}>
            <div>{geterror !== null ? geterror : null}</div>
            {cars?.map(car => <CarCard key={car._id} car={car}/>)}
            <button disabled={getButtons} onClick={() => prevPage()}>prev</button>
            <button disabled={getNextButtons} onClick={() => nextPage()}>next</button>
        </div>
    );
};

export default Cars;
