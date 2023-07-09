import {
    ManageAccountsOutlined,
    EditOutlined,
    LoationOnOutlined,
    WorkOutlineOutlined,
    LocationOnOutlined,

} from "@mui/icons-material"
import {Box,Typography,Divider,useTheme} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

import {useSelector} from "react-redux";
import { useEffect,useState } from "react";
import {useNavigate} from "react-router-dom";

const UserWidget=({userId,picturePath})=>{
    const [user,setUser]=useState(null);
    const {palette}=useTheme();
    const navigate=useNavigate();
    const token=useSelector((state)=>state.token);
    const dark=palette.neutral.dark; 
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;
   // console.log(userId);
    const getUser=async()=>{
        const response =await fetch(`http://localhost:3001/users/${userId}`,{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`},
        });
        const data=await response.json();
       // console.log(data);
        setUser(data);
    };
    useEffect(()=>{
        getUser();
    },[]);
    if(!user){
        return null;
    }
    const{
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    }=user;
  // console.log(user+"harsh data");
return(
    <WidgetWrapper>
        {}
        <FlexBetween gap="0.5rem" pb="1.1rem" onClick={()=>navigate(`/profile/${userId}`)}>
            <FlexBetween gap="1rem" sx={{paddingLeft:"2em",
        paddingTop:"2em"}}>
                <UserImage image={picturePath}/>
                <Box>
                    <Typography variant="h4" color={dark} fontWeight="500" sx={{
                        "&:hover":{
                            color:palette.primary.light,
                            cursor:"pointer"
                        },
                    }}>
                        {firstName}{lastName}
                    </Typography>
                    <Typography color={medium}>{friends.length} friends</Typography>
                </Box>
              
            </FlexBetween>
            <ManageAccountsOutlined sx={{width:"2em"}}/>
            </FlexBetween>
            <Divider/>
            {/*Second Row*/}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{color:main,
                    width:"2em"}}/>
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{color:main,
                    width:"2em"}}/>
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider/>
            {/*Third Row*/}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                <Typography color={medium} sx={{
                   paddingLeft:"2em"
                }}>Who's viewed your profile</Typography>
                <Typography color={main} fontWeight="500" sx={{
                   
                   paddingRight:"2em"
                }}>{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                <Typography color={medium}sx={{paddingLeft:"2em"}}>Impressions of your post</Typography>
                <Typography color={main} fontWeight="500" sx={{
                    paddingRight:"2em"
                }}>{impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider/>
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem" sx={{paddingLeft:"2em"}}>
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem" sx={{paddingLeft:"2em"}}>
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter"/>
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color:main,
                 width:"2em"}}/>
                </FlexBetween>
<FlexBetween gap="1rem" sx={{paddingLeft:"2em"}} >
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin"/>
                        <Box>
                            <Typography color={main} fontWeight="500">
                            Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color:main,
                    width:"2em"}}/>
                </FlexBetween>


            </Box>
            
    </WidgetWrapper>
);
};
export default UserWidget;