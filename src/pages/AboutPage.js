import {useParams} from "react-router";

export default function AboutPage(){
        const params = useParams();
    console.log(params);

    return(
        <div>
            about page

        </div>
    )
}