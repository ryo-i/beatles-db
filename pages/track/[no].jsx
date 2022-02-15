import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { no } = router.query;

  return <p>track: {no}</p>;
};

export default Post;