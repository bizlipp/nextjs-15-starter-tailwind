'use client';

// This is a redirect component that loads the actual SoundLab2 page from its current location
// since the file is at soundlab/soundlab2/page.js but we want to access it from /soundlab2
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

// Import the actual SoundLab2 component
import SoundLab2 from '../soundlab/soundlab2/page';

export default function SoundLab2Redirect() {
    // Use the actual SoundLab2 component directly
    return <SoundLab2 />;
}
