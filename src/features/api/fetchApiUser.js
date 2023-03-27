import axiosClient from "../../api/axiosClient";

export const fetchApiUser = async(url, { id = '', params= '',...option }) => {
    return axiosClient(`${url}/${id}?${params}`, { ...option});
  };