import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//  export async function getServerSideProps(context) {
//      const req = context.req;
//      const res = context.res;
//      return {
//          props: {
//             meetups: DUMMY_MEETUPS
//          }
//      };
//  }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Wokila:k5vu9ax4zLFUEVk@cluster0.toak6.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
