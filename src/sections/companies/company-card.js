import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import {PlusIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
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
} from "@mui/material";
// import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { red } from "@mui/material/colors";
import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
export const CompanyCard = (props) => {
  const { company } = props;

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
          <Typography align="right" variant="body1" >
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
          {/* <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Updated 2hr ago
          </Typography> */}
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
          {/* <SvgIcon
            color="action"
            fontSize="small"
          >
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {company.downloads} Downloads
          </Typography> */}
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PencilSquareIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
