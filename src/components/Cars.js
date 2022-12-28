import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Car from "./Car";
import {carActions} from "../redux";
import {useParams} from "react-router";

const Cars = () => {
    const {cars} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const {brand} = useParams();
    useEffect(() => {
        if (brand) {
            dispatch(carActions.getByBrand({brand}))
        } else {
            dispatch(carActions.getAll())
        }
    }, [brand])
    return (
        <div>
            {cars.map(car => <Car key={car._id} car={car}/>)}
        </div>
    );
};

export default Cars;