// eslint-disable-next-line import/no-unresolved
import FormRegister from "~/components/FormRegister";
// eslint-disable-next-line import/no-unresolved
import GridRegister from "~/components/GridRegister";
// eslint-disable-next-line import/no-unresolved
import Header from "~/components/Header";


export default function Register() {
    return (
        <div>
            <Header></Header>
            <FormRegister></FormRegister>
            <GridRegister></GridRegister>

        </div>
    )
}