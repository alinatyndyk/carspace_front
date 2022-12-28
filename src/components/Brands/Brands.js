import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {brandActions, carActions} from "../../redux";
import Brand from "./Brand";
import {useParams} from "react-router";

const Brands = () => {
    const {brands} = useSelector(state => state.brands);
    const dispatch = useDispatch();
    const {brand} = useParams()
    console.log(brand, 'brand in brands');
    useEffect(() => {
        if (brand) {
            dispatch(carActions.getByBrand({brand}))
            console.log('in if brand');
        } else {
            dispatch(brandActions.getAll())
            console.log('in if not brand');
        }
    }, [brand])
    return (
        <div>
            {brands.map(item => <Brand key={item._id} item={item}/>)}
        </div>
    );
};

export default Brands;