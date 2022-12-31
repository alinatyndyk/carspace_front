import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Car from "./Car";
import {carActions} from "../redux";
import {useParams} from "react-router";

const Cars = () => {
    const {cars, car} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const {brand, car_id} = useParams();
    console.log(brand, car_id, 'use params');
    useEffect(() => {
        if (brand) {
            console.log('else if brand');
            const res = dispatch(carActions.getByBrand({brand}))
            console.log(res);
        }else if (car_id) {
            console.log('else if car id');
            const res = dispatch(carActions.getById({_id: car_id}))
            console.log(res, 'res from dispatch');
        } else {
            const res = dispatch(carActions.getAll())
            console.log(res);
        }
    }, [brand, car_id])
    if (car_id) {
        return (
            <div>
                <Car car={car}/>

            </div>
        )
    }
    return (
        <div>
            {cars?.map(car => <Car key={car._id} car={car}/>)}
        </div>
    );
};

export default Cars;