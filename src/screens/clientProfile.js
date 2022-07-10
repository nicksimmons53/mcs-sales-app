import React from "react";
import {
  Box,
  Divider,
  HamburgerIcon,
  Heading,
  HStack,
  Menu,
  Pressable, Text,
  VStack,
} from "native-base";
import {
  useDeleteAddressMutation, useDeleteContactMutation, useDeleteProgramInfoMutation, useDeleteProgramPartsMutation,
  useGetClientByIdQuery,
  useUpdateApprovalsMutation, useUpdateProgramsMutation,
  useUpdateStatusMutation,
} from "../services/client";
import S3 from "../utils/S3";
import Toolbar from "../components/toolbar";
import Table from "../components/table";
import Loading from "./loading";
import AddContactForm from "../forms/addContactForm";
import AddAddressForm from "../forms/addAddressForm";
import AddProgramForm from "../forms/addProgramForm";
import { useSelector } from "react-redux";

const statusColors = {
  Potential: "primary.900",
  Queued: "warning.500",
  Declined: "error.600",
  Approved: "success.400",
  Pushed: "darkBlue.500",
};

export default function ClientProfile({ navigation, route }) {
  const clientId = route.params?.clientId;
  const user = useSelector(state => state.auth.user);
  const { data, error, isLoading } = useGetClientByIdQuery(clientId);
  const [files, setFiles] = React.useState([]);
  const [updateStatus, result] = useUpdateStatusMutation();
  const [updateApprovals, result1] = useUpdateApprovalsMutation();
  const [updatePrograms, result2] = useUpdateProgramsMutation();
  const [deleteAddress, result3] = useDeleteAddressMutation();
  const [deleteContact, result4] = useDeleteContactMutation();
  const [deleteProgram, result5] = useDeleteProgramInfoMutation();
  const [deleteParts, result6] = useDeleteProgramPartsMutation();

  React.useEffect(() => {
    const getFiles = async () =>
      setFiles(await S3.getFiles(user, data.basicInfo.name));

    if (data) {
      getFiles();
    }
  }, [data, user]);

  if (data === undefined || isLoading) {
    return <Loading navigation={navigation} />;
  }

  const formatFileArray = arr => {
    if (arr === undefined) {
      return [];
    }

    let newArr = arr.map((file, index) => ({
      name: file.Name,
      type: file.Name.split(".")[file.Name.split(".").length - 1],
      size: (file.Size / 1024).toFixed(2) + " KBs",
      Bucket: file.Bucket,
      Key: file.Key,
    }));

    return newArr;
  };

  const formatApprovalsArr = arr => {
    if (arr === undefined) {
      return [];
    }

    let newArr = Object.keys(arr).map(x => ({
      name: x,
      value:
        data.approvals[x] === 1
          ? "Approved"
          : data.approvals[x] === 0
          ? "Declined"
          : "No Response",
    }));

    return newArr;
  };

  const formatPrograms = arr => {
    return Object.keys(arr)
      .filter(x => arr[x] === 1)
      .map((x, index) => ({ selection: x, key: x }));
  };

  return (
    <HStack flex={1} justifyContent={"flex-start"} pt={5}>
      <Toolbar navigation={navigation} />

      <VStack flex={1}>
        <VStack mx={2}>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            my={2}
            width={"100%"}>
            <Heading color={"coolGray.800"} p={1}>
              {data.basicInfo.name}
            </Heading>
            <Box
              alignItems={"center"}
              borderColor={statusColors[data.status.current]}
              borderRadius={"lg"}
              borderWidth={1}
              bg={statusColors[data.status.current]}
              p={2}
              w={"15%"}>
              <Text color={"white"}>{data.status.current}</Text>
            </Box>
          </HStack>

          <Divider bg={"coolGray.800"} />

          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            my={2}
            width={"100%"}>
            <Heading color={"coolGray.800"} p={1} size={"md"}>
              Territory: {data.basicInfo.territory || "None Selected"}
            </Heading>

            <Box>
              <Menu
                trigger={triggerProps => (
                  <Pressable {...triggerProps}>
                    <HamburgerIcon />
                  </Pressable>
                )}
                w={200}>
                <Menu.Item
                  onPress={() =>
                    navigation.push("ClientDetails", { clientId: clientId })
                  }>
                  Client Details
                </Menu.Item>
                <Menu.Item
                  onPress={() =>
                    navigation.push("ProgramDetails", {
                      programs: data.programs,
                      clientId: clientId,
                    })
                  }>
                  Program Details
                </Menu.Item>
                <Menu.Item
                  onPress={() =>
                    navigation.push("ProgramPricing", {
                      programs: data.programs,
                      clientId: clientId,
                    })
                  }>
                  Program Pricing
                </Menu.Item>
                <Divider bg={"coolGray.400"} />
                <Menu.Item
                  onPress={() => {
                    updateStatus({ id: clientId, body: { status: "Queued" } });
                    updateApprovals({
                      id: clientId,
                      body: {
                        edythc: null,
                        lisak: null,
                        kimn: null,
                      },
                    });
                  }}
                  isDisabled={
                    data.status.current !== "Potential" &&
                    data.status.current !== "Declined"
                  }>
                  Submit Client
                </Menu.Item>
                <Divider bg={"coolGray.400"} />
                <Menu.Item
                  onPress={() => {
                    updateStatus({ id: clientId, body: { status: "Pushed" } });
                  }}
                  isDisabled={data.status.current !== "Approved"}>
                  Push Client
                </Menu.Item>
              </Menu>
            </Box>
          </HStack>
        </VStack>

        <Table
          columnNames={["Type", "Street", "City", "State", "Zip"]}
          fields={["type", "address", "city", "state", "zip"]}
          data={data.addresses}
          title={"Addresses"}
          addIcon={true}
          editIcon={true}
          form={
            data.addresses.length !== 3 ? (
              <AddAddressForm
                clientId={clientId}
                selectedAddresses={data.addresses}
              />
            ) : null
          }
          position={"left"}
          alertHeader={"Delete Address"}
          alertBody={
            "Are you sure you would like to delete this record? Once deleted, this record can not be retrieved."
          }
          rowAction={row =>
            deleteAddress({ clientId: row.clientId, id: row.id })
          }
        />

        <Table
          columnNames={["Name", "Title", "Phone", "Email"]}
          fields={["name", "title", "phone", "email"]}
          data={data.contacts}
          title={"Contacts"}
          addIcon={true}
          editIcon={true}
          form={<AddContactForm clientId={clientId} />}
          position={"left"}
          alertHeader={"Delete Contact"}
          alertBody={
            "Are you sure you would like to delete this record? Once deleted, this record can not be retrieved."
          }
          rowAction={row =>
            deleteContact({ clientId: row.clientId, id: row.id })
          }
        />

        <HStack flex={1}>
          <VStack flex={1}>
            <Table
              columnNames={["Selected"]}
              data={formatPrograms(data.programs)}
              fields={["selection"]}
              title={"Programs"}
              addIcon={true}
              editIcon={true}
              form={
                <AddProgramForm
                  clientId={clientId}
                  selectedPrograms={formatPrograms(data.programs)}
                />
              }
              alertHeader={"Delete Program"}
              alertBody={
                "Are you sure you would like to delete this record? Once deleted, this record can not be retrieved and all related information (pricing and details) will be deleted."
              }
              rowAction={row => {
                updatePrograms({
                  id: clientId,
                  body: { [row.selection.toLowerCase()]: 0 },
                });
                deleteProgram({
                  program: row.selection.toLowerCase(),
                  id: clientId,
                });
                deleteParts({
                  program: row.selection,
                  id: clientId,
                });
              }}
            />
          </VStack>
          <VStack flex={2}>
            <Table
              columnNames={["Name", "Type", "Size"]}
              data={formatFileArray(files)}
              fields={["name", "type", "size"]}
              title={"Files"}
              addIcon={true}
              editIcon={true}
              action={async () => await S3.putObject(user, data.basicInfo.name)}
              link={true}
              rowAction={S3.viewObject}
            />
          </VStack>
          <VStack flex={1}>
            <Table
              columnNames={["Manager", "Decision"]}
              data={formatApprovalsArr(data.approvals)}
              fields={["name", "value"]}
              title={"Approvals"}
            />
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
