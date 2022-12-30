import RegisterForm from "../components/Forms/RegisterForm";

export default function RegisterPage({el}){
    console.log(el)
    return(
        <div>
            register page
            <RegisterForm/>
            {JSON.stringify(el)}
        </div>
    )
}