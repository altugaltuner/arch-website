import axios from "axios";

export const getAccessRoles = async () => {
    axios.get('/http://localhost:1337/api/accesses');
} // burada api oluşturduk. ve getAccessRoles fonksiyonu ile access endpointine get request yaptık. ve authorization fonksiyonunu kullandık.