import { useState, useEffect } from "react";
import ListBook from "./ListBook";

const Home = () => {

    const [list, setList] = useState(true);

    return (
        <>
            {list && <ListBook />}
        </>
    )
}
export default Home;