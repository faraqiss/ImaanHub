import React from "react";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import {
  View,
  Box,
  ScrollView,
  Text,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionContentText,
  AccordionTitleText,
  AccordionIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@gluestack-ui/themed";

import { faqLists } from "../../hooks/faq";

const FaqScreen = () => {
  const dataFaq = faqLists;

  return (
    <>
      <StatusBar style="light" />
      <GluestackUIProvider config={config}>
        <View>
          <Box
            backgroundColor="#bf6b8f"
            padding={10}
            height={100}
            justifyContent="center"
            alignItems="center"
          ></Box>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 15, marginTop: 20 }}
        >
          <View justifyContent="center" alignItems="center">
            <Accordion
              m="$5"
              width="97%"
              size="sm"
              variant="filled"
              type="single"
              isCollapsible={true}
              isDisabled={false}
            >
              {dataFaq.map((item, idx) => (
                <AccordionItem key={idx} value={item.id}>
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>{item.q}</AccordionTitleText>
                            {isExpanded ? (
                              <AccordionIcon as={ChevronUpIcon} ml="$3" />
                            ) : (
                              <AccordionIcon as={ChevronDownIcon} ml="$3" />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>{item.a}</AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </View>
        </ScrollView>
      </GluestackUIProvider>
    </>
  );
};

export default FaqScreen;
