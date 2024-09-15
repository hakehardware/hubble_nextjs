import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from 'next'
import LatestEvents from "./LatestEvents";
import ContainerCounts from "./ContainerCounts";

export default function Home() {
  return (
    <Grid columns={{initial: '1', sm: '2', md: '2', lg: '2'}} gap='2'>
      <ContainerCounts />
      <LatestEvents />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'SpacePort - Hubble',
}