import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
// import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
const data = {
  url: "5e887ac47eed253091be10cb",
  description: ".post-section > div > p::text",
  title: ".page-h1::text",
  price: ".post-price::text",
  address: "post-price::text",
  acreage: "post-price::text",
  link_url: "post-price::text",
  link_image: ".leftCol > .post-images > img::attr(data-src)'",
  direction: ".leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text",
  date: ".leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text",
  name_contact: ".leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text",
  phone_contact: ".leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text",
  bed_room: ".post-bedroom::text",
  bath_rooom: ".post-bathroom::text",
};
export const CompanyCard = (props) => {
  const { company } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src={company.logo} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {company.title}
        </Typography>
        <Typography align="center" variant="body1">
          {company.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            direction: "row",
            // justifyContent: "center",
          }}
        >
          <Typography align="left" variant="body1" fontWeight="bold">
            Total:
          </Typography>
          <Typography align="right" variant="body1">
            1000
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            direction: "row",
            // justifyContent: "center",
          }}
        >
          <Typography align="left" variant="body1" fontWeight="bold">
            Status:
          </Typography>
          <Typography align="right" variant="body1" color="green">
            Success
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            direction: "row",
            // justifyContent: "center",
          }}
        >
          <Typography align="left" variant="body1" fontWeight="bold">
            Date:
          </Typography>
          <Typography align="right" variant="body1" color>
            31/10/2023
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="flex-start" direction="row" spacing={1}>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Crawl
          </Button>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PencilSquareIcon />
              </SvgIcon>
            }
            variant="contained"
            onClick={handleClickOpen}
          >
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{company.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* To subscribe to this website, please enter your email address here. We will send
                updates occasionally. */}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="url"
                label="Url"
                type="text"
                fullWidth
                variant="standard"
                value={data.url}
              />
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="title"
                type="text"
                fullWidth
                variant="standard"
                value={data.title}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                value={data.description}
              />
              <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                value={data.price}
              />
              <TextField
                autoFocus
                margin="dense"
                id="link_image"
                label="Image"
                type="text"
                fullWidth
                variant="standard"
                value={data.link_url}
              />
              <TextField
                autoFocus
                margin="dense"
                id="link_image"
                label="Image"
                type="text"
                fullWidth
                variant="standard"
                value={data.link_image}
              />

              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                variant="standard"
                value={data.address}
              />
              <TextField
                autoFocus
                margin="dense"
                id="acreage"
                label="Acreage"
                type="text"
                fullWidth
                variant="standard"
                value={data.acreage}
              />
              <TextField
                autoFocus
                margin="dense"
                id="direction"
                label="Direction"
                type="text"
                fullWidth
                variant="standard"
                value={data.direction}
              />
              <TextField
                autoFocus
                margin="dense"
                id="date"
                label="Date"
                type="text"
                fullWidth
                variant="standard"
                value={data.date}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name_contact"
                label="Name Contact"
                type="text"
                fullWidth
                variant="standard"
                value={data.name_contact}
              />
              <TextField
                autoFocus
                margin="dense"
                id="phone_contact"
                label="Phone Contact"
                type="text"
                fullWidth
                variant="standard"
                value={data.phone_contact}
              />
              <TextField
                autoFocus
                margin="dense"
                id="bedroom"
                label="Bed Room"
                type="text"
                fullWidth
                variant="standard"
                value={data.bed_room}
              />
              <TextField
                autoFocus
                margin="dense"
                id="bathroom"
                label="Bath Room"
                type="text"
                fullWidth
                variant="standard"
                value={data.bath_rooom}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Update</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
