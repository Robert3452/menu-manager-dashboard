import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { branchesApi } from "../../../api/branch-api";
import { ubigeoApi } from "../../../api/masterData/ubigeo";
import { Home as HomeIcon } from "../../../icons/home";
import { OfficeBuilding as BuildingIcon } from "../../../icons/office-building";
import { createAddress, updateAddress } from "../../../slices/branches";
import { useDispatch, useSelector } from "../../../store";

const addressTypesOptions = [
  {
    description: "House",
    title: "Casa",
    value: "house",
    icon: <HomeIcon />,
  },
  {
    description: "work",
    title: "Trabajo",
    value: "work",
    icon: <BuildingIcon />,
  },
];

const streetTypes = [
  { text: "Avenue", value: "avenue" },
  { text: "Street", value: "street" },
  { text: "Jiron", value: "jiron" },
  { text: "Pasaje", value: "pasaje" },
];
export const AddressBranchForm = (props) => {
  const { branch, ...other } = props;
  const [department, setDepartment] = useState(null);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    address: Yup.string().required("This field is required"),
    department: Yup.string().required("Department field is required"),
    province: Yup.string().required("Province field is required"),
    district: Yup.string().required("District field is required"),
    //mapLink: Yup.string(),//.required("MapLink field is required"),
    streetNumber: Yup.string().required("Street Number field is required"),
    streetType: Yup.string().required("Street Type field is required"),
    addressType: Yup.string().required("Address type field is required"),
    phoneNumber: Yup.string().required("Phone Number field is required"),
    references: Yup.string(), //.required("References field is required")
  });
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const formik = useFormik({
    initialValues: {
      address: branch?.address?.address || "",
      department: branch?.address?.department || "",
      province: branch?.address?.province || "",
      district: branch?.address?.district || "",
      // mapLink: branch?.address. ||,
      streetNumber: branch?.address?.streetNumber || "",
      streetType: branch?.address?.streetType || "",
      addressType: branch?.address?.addressType || "",
      phoneNumber: branch?.address?.phoneNumber || "",
      references: branch?.address?.references || "",
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      let branchId;
      try {
        if (branch?.address?.id) {
          const addressResponse = await dispatch(
            updateAddress({
              branchId: branch.id,
              address: { ...values, id: branch.address.id },
            })
          );
          toast.success(addressResponse.message);
        } else {
          const addressResponse = await dispatch(
            createAddress({ branchId: branch.id, address: values })
          );
          toast.success(addressResponse.message);
        }
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        // router.push("/dashboard/stores")
      } catch (err) {
        if (branchId) await branchesApi.deleteBranch(branchId);
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const handleProvince = (event, newValue) => {
    getDistricts(department, newValue);
    setProvince(newValue);
    let form = formik.values;
    form.province = newValue?.name;

    if (districts.length > 0) {
      form.address.district = "";
      setDistrict(null);
    }
    formik.setValues(form);
  };
  const handleDepartment = (event, newValue) => {
    getProvinces(newValue);
    setDepartment(newValue);
    let form = formik.values;
    form.department = newValue?.name;
    if (provinces.length > 0) {
      setProvince(null);
      setDistrict(null);
      form.province = "";
      form.district = "";
      setDistricts([]);
    }
    formik.setValues(form);
  };
  const handleDistrict = (event, newValue) => {
    setDistrict(newValue);
    let form = formik.values;
    form.district = newValue?.name;
    formik.setValues(form);
  };
  const getDepartments = async () => {
    try {
      const data = await ubigeoApi.getDepartments();
      setDepartments(data);
      return data;
    } catch (error) {
      console.log(error);
      setDepartments([]);
    }
  };
  const getProvinces = async (department) => {
    try {
      const data = await ubigeoApi.getProvincesByDepartmentCode(
        department.departmentCode
      );
      setProvinces(data);
      return data;
    } catch (error) {
      console.log(error);
      setProvinces([]);
      setDistricts([]);
    }
  };
  const getDistricts = async (department, province) => {
    try {
      const data = await ubigeoApi.getDistrictsByProvinceCode(
        department.departmentCode,
        province.provinceCode
      );
      setDistricts(data);
      return data;
    } catch (error) {
      console.log(error);
      setDistricts([]);
    }
  };
  const [streetType, setStreetType] = useState(null);

  const handleEditForm = async () => {
    const currDepartment = departments.find(
      (el) => el.name == branch?.address?.department
    );
    if (!currDepartment) return;
    setDepartment(currDepartment);
    const provinces = await getProvinces(currDepartment);
    const currProvince = provinces.find(
      (el) => el.name == branch.address.province
    );
    const districts = await getDistricts(currDepartment, currProvince);
    setProvince(currProvince);
    const currDistrict = districts.find(
      (el) => el.name == branch.address.district
    );
    setDistrict(currDistrict);
  };
  useEffect(() => {
    if (!branch || departments.length == 0) return;
    handleEditForm();
  }, [departments, branch]);

  useEffect(() => {
    getDepartments();
    if (router.query?.branchId) {
      setStreetType(
        streetTypes.find(
          (el) => el.value.toLowerCase() == branch?.address?.streetType
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const streetTypeChange = (event, newValue) => {
    let form = formik.values;
    form.streetType = newValue?.value;
    formik.setValues(form);
    setStreetType(newValue);
  };
  const radioButtonChange = (event) => {
    const { value } = event.target;
    const form = formik.values;
    form.addressType = value;
    // console.log(form)
    formik.setValues(form);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} {...other}>
        <Card>
          <CardHeader sx={{ pb: 0 }} title="Address" />
          <CardContent sx={{ pb: 0 }}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option?.departmentCode === value?.departmentCode
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => option.departmentCode}
                  options={departments}
                  value={department}
                  onChange={handleDepartment}
                  renderInput={(params) => (
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Department"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option?.provinceCode === value?.provinceCode
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => option.provinceCode}
                  options={provinces}
                  onChange={handleProvince}
                  value={province}
                  autoComplete={false}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="Province"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option?.districtCode === value?.districtCode
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => option.districtCode}
                  options={districts}
                  onChange={handleDistrict}
                  value={district}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="District"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  getOptionLabel={(option) => option.text}
                  getOptionKey={(option) => option.value}
                  options={streetTypes}
                  onChange={streetTypeChange}
                  value={streetType}
                  renderInput={(params) => (
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Street type / Tipo de calle"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched["streetNumber"] &&
                      formik.errors["streetNumber"]
                  )}
                  fullWidth
                  type="number"
                  autoComplete="off"
                  helperText={
                    formik.touched["streetNumber"] &&
                    formik.errors["streetNumber"]
                  }
                  label="Number / Número"
                  name="streetNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values?.streetNumber}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched["address"] && formik.errors["address"]
                  )}
                  fullWidth
                  helperText={
                    formik.touched["address"] && formik.errors["address"]
                  }
                  label="Address / Dirección"
                  autoComplete="off"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values?.address}
                />
              </Grid>
              <Grid item xs={12} sx={{ pt: 1 }}>
                <Typography variant="caption">
                  {/* TODO: add n18 */}
                  ¿Trabajo o casa?
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <RadioGroup
                  row
                  name={"addressType"}
                  value={formik.values?.addressType}
                  onChange={radioButtonChange}
                >
                  {addressTypesOptions.map((typeOption) => (
                    <FormControlLabel
                      control={<Radio />}
                      value={typeOption.value}
                      key={typeOption.value}
                      label={
                        <Box
                          display={"flex"}
                          alignItems={"flex-end"}
                          justifyContent={"flex-start"}
                        >
                          {typeOption.icon ?? <HomeIcon />}
                          <Typography
                            style={{ marginLeft: "10px" }}
                            variant="subtitle2"
                          >
                            {typeOption.title}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched["phoneNumber"] &&
                      formik.errors["phoneNumber"]
                  )}
                  fullWidth
                  type="number"
                  helperText={
                    formik.touched["phoneNumber"] &&
                    formik.errors["phoneNumber"]
                  }
                  label="Phone number / Número de teléfono"
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values?.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched["references"] && formik.errors["references"]
                  )}
                  fullWidth
                  helperText={
                    formik.touched["references"] && formik.errors["references"]
                  }
                  label="Reference / Referencia"
                  name="references"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  multiline
                  rows={6}
                  value={formik.values?.references}
                />
              </Grid>
              {/* <Grid
                                item
                                xs={12}>
                                <Divider />
                                <Box
                                    sx={{ py: 4 }}
                                >

                                    <Typography
                                        color="inherit"
                                        variant="h4"
                                    >
                                        Schedule
                                    </Typography>
                                </Box>
                                <FieldArray
                                    name="weekdaySchedules"
                                    render={(arrayHelpers) => (

                                        <WeekdayTable
                                            arrayHelpers={arrayHelpers}
                                            formik={formik} />
                                    )}
                                >

                                </FieldArray>
                            </Grid> */}
            </Grid>
          </CardContent>

          <CardActions
            sx={{
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <NextLink href="/dashboard/stores" passHref>
              <Button
                component="a"
                disabled={formik.isSubmitting}
                sx={{
                  m: 1,
                  ml: "auto",
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </NextLink>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              sx={{ m: 1, ml: "auto" }}
              variant="contained"
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </form>
    </FormikProvider>
  );
};

AddressBranchForm.propTypes = {};

export default AddressBranchForm;
