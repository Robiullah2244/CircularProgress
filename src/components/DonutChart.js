import React, { FC } from 'react';

import {
  Canvas,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import { StyleSheet, View, Image } from 'react-native';

export const DonutChart = ({
  strokeWidth,
  radius,
  percentageComplete,
  strokeColor,
  image,
  dashed,
}) => {
  const innerRadius = radius - strokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);
  dashed && path.dash(2, 6, 0);
  // path.close();
  // console.log('path', path.toSVGString());

  // const imageResources = useImage(image);
  // const svg = useSVG(require("./dash-circle-dotted-svgrepo-com.svg"));

  return (
    <View style={[styles.container,
      // {transform:[{rotate:'270deg'}]}
    ]}>
      <Canvas style={[styles.container, { transform: [{ rotate: '270deg' }] }]}>
        <Path
          path={path}
          color={strokeColor}
          style="stroke"
          strokeJoin="round"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />
        {/* {imageResources && (
          <Image
            image={imageResources}
            fit="contain"
            x={8}
            y={8}
            width={radius * 2 - 16}
            height={radius * 2 - 16}
            // opacity={1}
          />
        )} */}
      </Canvas>
      <View
        style={[
          {
            position: "absolute",
            height: radius * 2 - 16,
            width: radius * 2 - 16,
            // borderRadius: 64,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
            marginLeft: 8,
          },
        ]}
      >
        <Image source={image} style={[{ height: radius * 2 - 16, width: radius * 2 - 16, borderRadius: radius }]} resizeMode="cover" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
