import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const FAQScreen = () => {
    const { styles: themeStyles } = useContext(ThemeContext);

    const faqData = [
        {
            question: "What is the Satiety Index?",
            answer: "The Satiety Index is a tool that ranks foods based on how full they make you feel relative to white bread (which is given a score of 100). Developed in 1995 by researchers at the University of Sydney, the index helps understand which foods are more effective at curbing hunger and cravings. Foods with a higher satiety index score, like boiled potatoes, tend to be more filling and satisfying than those with lower scores, like croissants."
        },
        {
            question: "What does the Satiety Index measure?",
            answer: "The satiety index measures how satiating a food is, meaning how effectively it satisfies hunger and promotes a feeling of fullness."
        },
        {
            question: "How does the Satiety Index work?",
            answer: "The original study involved participants consuming 240-calorie portions of various foods and then rating their hunger levels. White bread was used as the reference food, with a score of 100. Other foods were then ranked based on how they compared to white bread in terms of their ability to satisfy hunger."
        },
        {
            question: "What are high vs. low satiety foods?",
            answer: "Foods with a higher satiety index score are generally more filling and satisfying, while those with lower scores are less so. For example, boiled potatoes (323) are three times more satisfying than white bread (100), while croissants (47) are much less satisfying."
        },
        {
            question: "What factors influence satiety?",
            answer: "Factors like protein, fiber, fat content, and processing can influence a food's satiety index. Protein and fiber tend to be associated with higher satiety scores, while higher fat and processed foods often have lower scores. Foods rich in water content also tend to be more filling."
        },
        {
            question: "How can I use the Satiety Index for weight management?",
            answer: "The Satiety Index can be a useful tool for individuals looking to manage their weight or hunger levels. Choosing foods with higher satiety index scores can help promote feelings of fullness and potentially reduce overall calorie intake. Foods rich in fiber also rank high and contain few calories."
        },
        {
            question: "What are the best food choices for weight loss?",
            answer: "Good choices are lean meat and chicken without the skin, foods rich in fiber like beans and lentils, whole meal bread, and foods rich in water. Vegetables are especially great for weight loss; they contain lots of nutritional value, few calories and they are filling. Generally speaking, foods that rank high and satisfy your hunger for a longer period of time are foods with high protein, water and/or fiber content."
        },
        {
            question: "What are some examples of high satiety foods?",
            answer: "• Boiled potatoes (323) - three times more satisfying than white bread\n• Fish (225) - excellent protein source\n• Oranges (202) - high in fiber and water\n• Apples (197) - rich in fiber\n• Brown pasta (188) - complex carbohydrates\n• Beef (176) - high protein content\n• Baked beans (168) - protein and fiber\n• Grapes (162) - water content\n• Whole meal bread (157) - fiber content\n• Popcorn (154) - bulk without many calories"
        },
        {
            question: "What are some examples of low satiety foods?",
            answer: "• Croissants (47) - high fat, processed\n• Cake (65) - high sugar, low fiber\n• Mars candy bar (70) - high sugar\n• Doughnuts (68) - high fat, processed\n• Ice cream (96) - high fat and sugar\n• White bread (100) - reference point, low fiber"
        },
        {
            question: "What are the limitations of the Satiety Index?",
            answer: "The Satiety Index has limitations. It doesn't tell you anything about the nutritional value of the food; only how well a certain food satisfies your hunger. For example, jellybeans score high (118) because they made test volunteers slightly nauseous, but they're high in sugar and a bad choice from a glycemic index perspective. The Satiety Index should be used together with knowledge of nutrition to make informed food choices."
        },
        {
            question: "How should I use the Satiety Index?",
            answer: "As with any index that measures just one thing, the satiety index has to be put into context - it can't be used on its own. Combine it with your knowledge of calorie content, nutritional value, and glycemic index to choose the right foods. A good diet for weight loss should contain at least some slowly-digested carbs and protein."
        }
    ];

    const [expandedIndex, setExpandedIndex] = React.useState(null);

    const toggleExpanded = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: themeStyles.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: themeStyles.text }]}>
                    Frequently Asked Questions
                </Text>
                <Text style={[styles.subtitle, { color: themeStyles.secondaryText }]}>
                    Understanding the Satiety Index and Volume Serenity Score
                </Text>
            </View>

            <View style={styles.faqContainer}>
                {faqData.map((faq, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.faqItem, { backgroundColor: themeStyles.card }]}
                        onPress={() => toggleExpanded(index)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.questionContainer}>
                            <Text style={[styles.question, { color: themeStyles.text }]}>
                                {faq.question}
                            </Text>
                            <Text style={[styles.expandIcon, { color: themeStyles.primary }]}>
                                {expandedIndex === index ? '−' : '+'}
                            </Text>
                        </View>
                        {expandedIndex === index && (
                            <Text style={[styles.answer, { color: themeStyles.secondaryText }]}>
                                {faq.answer}
                            </Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <View style={[styles.infoBox, { backgroundColor: themeStyles.primary + '20' }]}>
                <Text style={[styles.infoTitle, { color: themeStyles.primary }]}>
                    💡 Pro Tip
                </Text>
                <Text style={[styles.infoText, { color: themeStyles.text }]}>
                    The Satiety Index is just one tool in your nutrition toolkit. Always consider the overall nutritional value, calorie content, and how foods fit into your personal health goals when making food choices.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 24,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 22,
    },
    faqContainer: {
        marginBottom: 24,
    },
    faqItem: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    question: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        marginRight: 12,
    },
    expandIcon: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    answer: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    infoBox: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        lineHeight: 20,
    },
});

export default FAQScreen;

