import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {companyActions} from "../../redux";
import CompanyCard from "./CompanyCard";
import CompanyFull from "./CompanyFull";

const Companies = ({id}) => {
    const {companies, company} = useSelector(state => state.companies);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            const res = dispatch(companyActions.getById({_id: id}))
            console.log(res);
        } else {
            const res = dispatch(companyActions.getAll())
            console.log(res);
        }
    }, [id])
    if (id) {
        return (
            <div>
                Single company page
                <CompanyFull key={company._id} id={id} company={company}/>
            </div>
        )
    }

    return (

        <div>
            <h2>Companies our website provides</h2>
            {companies?.map(company => <CompanyCard key={company._id} company={company}/>)}
        </div>
    );
};

export default Companies;