import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {brandActions, carActions} from "../../redux";
import Brand from "./Brand";
import './Brands.css'
import {useParams} from "react-router";

const Brands = () => {
    const {brands} = useSelector(state => state.brands);
    const {brand} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (brand) {
            dispatch(carActions.getByBrand({brand}))
        } else {
            dispatch(brandActions.getAll())
        }
    }, [brand])

    return (
        <div>
            <h2>ALL AVAILABLE BRANDS</h2>
            <div className={'brands_wrap'}>
                {brands.map(item => <Brand key={item._id} item={item}/>)}
            </div>
        </div>
    );
};

export default Brands;