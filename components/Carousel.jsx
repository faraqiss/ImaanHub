import React, { useEffect, useState } from 'react'
import { Card, Image, View } from '@gluestack-ui/themed'
 
const images = [
  require('../assets/1.png'),
  require('../assets/2.png'),
  require('../assets/3.png'),
  require('../assets/4.png'),
  require('../assets/5.png'),
  require('../assets/6.png'),
  require('../assets/7.png'),
  require('../assets/8.png'),
  require('../assets/9.png'),
]
 
const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length) 
    },5000)
    return () => clearInterval(interval)
  },[])
 
  return (
    <View marginTop={20} marginHorizontal={20} marginBottom={20}>
      <Card width={'$full'}>
        <Image 
          source={images[currentImageIndex]}
          alt='gambar'
          width={'auto'}
          height={200}
        />
      </Card>
    </View>
  )
}
 
export default Carousel