import { NextPage } from 'next';
import Head from 'next/head';
import GeneralLayout from '../components/GeneralLayout';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SubscribeForm from '../features/user/forms/SubscribeForm';
import Image from 'next/image';
import Link from 'next/link';


const Hero = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} maxWidth="sm">
        <Typography 
          fontWeight="300"
          color="primary"
          marginBottom={2}
          sx={{ 
            fontSize: {
              xs: 20,
              sm: 24,
            }
          }}
        >
          {"Hey There"}
        </Typography>

        <Typography 
          fontFamily={'Old Standard TT'}
          fontWeight="700"
          lineHeight={1}
          marginBottom={3}
          sx={{ 
            fontSize: {
              xs: 40,
              sm: 52,
            } 
          }}
        >
          {"Got Job Rejections?"}
        </Typography>

        <Typography 
          variant="h6"
          fontWeight="300"
          fontFamily={'Old Standard TT'}
          fontStyle="italic"
          sx={{ 
            mt: 0,
            fontSize: {
              xs: 19,
              sm: 22,
            }
          }}
        >
          Don&apos;t worry your not alone... Here in <strong>Poralia</strong> we&apos;re together prepare for the next job interviews. <strong>{"Are you ready?"}</strong>
        </Typography>

        <Box marginTop={4}>
          <Image src={'/poralia-logo.png'} width="300" height="300" />
        </Box>

        <Box marginTop={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 4 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box>
                    <Typography fontSize={18} textTransform={'uppercase'} marginBottom={2}>{"For Candidate"}</Typography>
                    <Typography>
                      {"Expand your hired potentially with share rejections history. For many recruiters its valuable."}
                    </Typography>
                  </Box>

                  <Box marginTop={'auto'} paddingTop={3}>
                    <Link href="/signin?role=candidate">
                      <Button variant={'contained'} sx={{ borderRadius: 5 }}>Sign as Candidate</Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 4 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box>
                    <Typography fontSize={18} textTransform={'uppercase'} marginBottom={2}>{"For Recruiter"}</Typography>
                    <Typography>
                      {"Each companies has different value. But know rejections history maybe will change hiring process."}
                    </Typography>
                  </Box>

                  <Box marginTop={'auto'} paddingTop={3}>
                    <Link href="/signin?role=recruiter">
                      <Button variant={'contained'} sx={{ borderRadius: 5 }}>Sign as Recruiter</Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/*
        <Box 
          className="w-12/12 md:w-11/12 lg:w-11/12 xl:w-10/12 mx-auto" 
          padding={4}
          sx={{ 
            marginTop: {
              xs: 2,
              sm: 3,
              md: 4,
              lg: 5,
            }
          }}
        >
          <Typography
            fontSize={17}
            marginBottom={3}
          >
            {"Let's join! Together we can get resilience, share new opportunities and mind refresh after rejection"}
          </Typography>
          
          <SubscribeForm />

          <Divider sx={{
            marginTop: 5,
            marginBottom: 1,
          }}>
            {"Have an account?"}
          </Divider>

          <Link href="/signin">
            <Button variant="text">{"Sign In Instead"}</Button>
          </Link>
        </Box>
        */}
      </Box>
    </>
  )
}

const HowTo = () => {
  return (
    <>
      <Grid 
        container 
        maxWidth="lg"
        spacing={{
          sm: 4,
          md: 6
        }}
      >
        <Grid item xs={12} marginBottom={{xs: 4, sm: 3, md: 2 }}>
          <Typography
            variant="h2"
            textAlign="center"
            fontFamily={'Old Standard TT'}
            fontWeight={700}
            fontSize={{
              xs: 24,
              sm: 27,
              md: 30
            }}
          >
            {"Facts About Hiring Process"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={8} marginLeft="auto" marginRight="auto">
          <Grid container spacing={{xs: 2, sm: 2, md: 4 }}>
            <Grid item xs={12} sm={6} md={6} sx={{ marginBottom: { xs: 0 }}}>
              <Box display="flex">
                <CheckCircleIcon color="success" />
              
                <Typography
                  lineHeight={1.3}
                  paddingLeft={2}
                  fontSize={{
                    xs: 14,
                    sm: 16,
                    md: 18
                  }}
                >
                  <strong>60%</strong> jobs found through networking
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} sx={{ marginBottom: { xs: 0 }}}>
              <Box display="flex">
                <CheckCircleIcon color="success" />
              
                <Typography
                  lineHeight={1.3}
                  paddingLeft={2}
                  fontSize={{
                    xs: 14,
                    sm: 16,
                    md: 18
                  }}
                >
                  <strong>75%</strong> resumes rejected by machine (called ATS)
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} sx={{ marginBottom: { xs: 0 }}}>
              <Box display="flex">
                <CheckCircleIcon color="success" />
              
                <Typography
                  lineHeight={1.3}
                  paddingLeft={2}
                  fontSize={{
                    xs: 14,
                    sm: 16,
                    md: 18
                  }}
                >
                  <strong>70%</strong> candidates doesn&apos;t received good feedback after rejected
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} sx={{ marginBottom: { xs: 0 }}}>
              <Box display="flex">
                <CheckCircleIcon color="success" />
              
                <Typography
                  lineHeight={1.3}
                  paddingLeft={2}
                  fontSize={{
                    xs: 14,
                    sm: 16,
                    md: 18
                  }}
                >
                  <strong>94%</strong> candidates want to receive feedback
                </Typography>
              </Box>
            </Grid>
              
            <Grid item xs={12} sm={6} md={6} sx={{ marginBottom: { xs: 0 }}}>
              <Box display="flex">
                <CheckCircleIcon color="success" />
              
                <Typography
                  lineHeight={1.3}
                  paddingLeft={2}
                  fontSize={{
                    xs: 14,
                    sm: 16,
                    md: 18
                  }}
                >
                  <strong>77%</strong> jobseekers were left hanging by recruiters
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} sx={{ marginBottom: { xs: 0 }}}>
              <Box display="flex">
                <CheckCircleIcon color="success" />
              
                <Typography
                  lineHeight={1.3}
                  paddingLeft={2}
                  fontSize={{
                    xs: 14,
                    sm: 16,
                    md: 18
                  }}
                >
                  <strong>Average</strong> each jobseekers gets 6 - 10 rejections
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                  marginTop={1}
                  lineHeight={1.3}
                  paddingLeft={2}
                  fontWeight={700}
                  textAlign="center"
                  fontSize={{
                    xs: 18,
                    sm: 22,
                    md: 28
                  }}
                >
                  Here we are the union of jobseekers. We want to be a better person.
                </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Poralia</title>
        <meta name="description" content="Share job rejections then get new opportunity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GeneralLayout>
        <Container 
          maxWidth="lg" 
          sx={{
            py: 10,
            mx: 'auto',
          }}
        >
          <Hero />

          <Container 
            maxWidth="md" 
            sx={{ 
              margin: 'auto',
              marginTop: 8,
            }}
          >
            <HowTo />
          </Container>
        </Container>
      </GeneralLayout>
    </>
  )
}

export default Home
