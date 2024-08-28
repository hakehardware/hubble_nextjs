import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from 'next'
import LatestEvents from "./LatestEvents";

export default function Home() {
  return (
    <Grid>
      <LatestEvents />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'SpacePort - Hubble',
}