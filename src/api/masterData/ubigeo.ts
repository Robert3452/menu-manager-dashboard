import { HttpClient } from "../httpClient";

const httpClient = HttpClient(
  `${process.env.NEXT_PUBLIC_MENU_MANAGER_MASTER_DATA}/api/departments`
);

class UbigeoApi {
  async getDepartments() {
    try {
      const {
        data: { data },
      } = await httpClient.get("");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getProvincesByDepartmentCode(departmentCode: string) {
    const {
      data: { data },
    } = await httpClient.get(`/${departmentCode}/provinces`);
    return data;
  }
  async getDistrictsByProvinceCode(
    departmentCode: string,
    provinceCode: string
  ) {
    const {
      data: { data },
    } = await httpClient.get(
      `/${departmentCode}/provinces/${provinceCode}/districts`
    );
    return data;
  }
}

export const ubigeoApi = new UbigeoApi();
