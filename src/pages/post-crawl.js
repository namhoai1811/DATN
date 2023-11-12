import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/user/user-table";
import { CustomersSearch } from "src/sections/user/user-search";
import { applyPagination } from "src/utils/apply-pagination";
import { PostsCrawlSearch } from "src/sections/post-crawl/posts-crawl-search";
import { PostsCrawlTable } from "src/sections/post-crawl/posts-crawl-table";

const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
      "Nhà chính chủ mặt tiền đường tx 37 phường thạnh Xuân quận 12 một trệt một lững 6 x 11 full thổ cư 6 x 17. Thuộc khu dân cư mới. Bao tách sổ. Gần chợ gần trường.",
    title: "Cần bán gấp nhà thừa kế chính chủ",
    price: "6.5 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/01/img-20230731-130256-1_1696162393.jpg",
    address: "Địa chỉ: Phường Thạnh Xuân, Quận 12, Hồ Chí Minh",
    link_url: "https://bds123.vn/can-ban-gap-nha-thua-ke-chinh-chu-pr730697.html",
  },
  {
    id: "5e887ac47eed253091be10cb",
    description:
    "Chính chủ cần bán nhà 2 tầng - 1 tum kiệt Thái Thị Bôi - Thanh Khê",
    title: "Cần bán nhà kiệt gần đường Thái Thị Bôi",
    price: "2.45 ty",
    img_url:
      "https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/10/20/z4801597864353-b7d6acf0185e5b54c687b4bce536d56e_1697791668.jpg",
    address: "Địa chỉ: Đường Thái Thị Bôi, Phường Chính Gián, Thanh Khê, Đà Nẵng",
    link_url: "https://bds123.vn/can-ban-nha-kiet-gan-duong-thai-thi-boi-pr740015.html",
  },

];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Customers</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Post Crawl</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <PostsCrawlSearch />
            <PostsCrawlTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
