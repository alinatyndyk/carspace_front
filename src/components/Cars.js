import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CarCard from "./CarCard";
import {carActions} from "../redux";
import {useParams} from "react-router";

const Cars = ({id}) => {
    const {cars, car, errors} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    console.log(id, 'ID IN CARS');
    const {brand} = useParams();
    useEffect(() => {
        // if (brand) {
        //     console.log('else if brand');
        //     const res = dispatch(carActions.getByBrand({brand}))
        //     console.log(res);
        // } else
        if (id) {
            console.log(id, 'if id cars');
            dispatch(carActions.getById({_id: id}))
            // console.log(car);
        } else {
            console.log(id, 'if all cars');
            const {errors} = dispatch(carActions.getAll())
            console.log(errors, 'if all cars');
        }
    }, [id]);
    if (id !== undefined) {
        return (
            <div>
                sinfle cra gape
                <CarCard car={car} id={id}/>

            </div>
        )
    }
    return (
        <div>
            {errors}
            {cars?.map(car => <CarCard key={car._id} car={car}/>)}
            {/*{id ? <div><CarCard key={id} car={car}/></div>*/}
            {/*    : null}*/}
        </div>
    );
};

export default Cars;