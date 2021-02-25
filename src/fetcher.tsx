import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => (res.data as any[]).slice(0, 32));

export default fetcher;
