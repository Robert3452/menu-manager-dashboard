import { Box, Button, Card, Container } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Plus as PlusIcon } from "../../../../icons/plus";
import { CategoryListTable } from "./category-list-table";

const CategoryList = ({ arrayHelpers, formik }: any) => {
  const addCategory = () => {
    let form = { ...formik.values };
    const newCategory = {
      title: "Nueva categoría",
      minToppingsForCategory: 0,
      maxToppingsForCategory: 0,
      toppingType: "exclusive",
      mandatory: true,
      key: uuidv4(),
      id: 0,
      toppings: [],
    };
    form.toppingCategories = [...form?.toppingCategories, newCategory];
    const mapped = form.toppingCategories.map((el: any, index: number) => ({
      ...el,
      index,
    }));
    form = {
      ...form,
      toppingCategories: [...mapped],
    };
    formik.setValues(form);
  };

  return (
    <Box component="main">
      <Container maxWidth="xl">
        <Card>
          <Button
            onClick={addCategory}
            startIcon={<PlusIcon fontSize="small" />}
            sx={{
              m: 3,
              order: {
                xs: -1,
                md: 0,
              },
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
            variant="contained"
          >
            Categoría
          </Button>
          <CategoryListTable
            categories={formik.values.toppingCategories}
            formik={formik}
            arrayHelpers={arrayHelpers}
          />
        </Card>
      </Container>
    </Box>
  );
};

export default CategoryList;
