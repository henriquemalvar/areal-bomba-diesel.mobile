import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const COLORS = {
  primary: '#0a2c63',
  error: '#F44336',
  background: '#fff',
  cardBackground: '#fff',
  inputBackground: '#f7f9fb',
  text: '#222',
  textSecondary: '#757575',
  border: '#ddd',
  avatar: '#0a2c63',
};

const FloatingButtons = ({ 
  buttons,
  position = 'right',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (isOpen) {
          toggleMenu();
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [isOpen]);

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveTooltip(null);
    }
  };

  const renderButton = (button, index) => {
    const baseAngle = position === 'right' ? 180 : 0;
    const angle = (baseAngle + (index * 45)) * (Math.PI / 180);
    const radius = 80;
    
    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.cos(angle) * radius],
    });
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.sin(angle) * radius],
    });
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const opacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const tooltipTranslateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.cos(angle) * (radius - 40)],
    });
    const tooltipTranslateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.sin(angle) * (radius - 40)],
    });

    const isRightSide = position === 'right';
    const tooltipStyle = {
      ...styles.tooltipContainer,
      [isRightSide ? 'right' : 'left']: 50,
      top: '50%',
      transform: [
        { translateY: -15 },
        { translateX: tooltipTranslateX },
        { translateY: tooltipTranslateY },
      ],
    };

    return (
      <Animated.View
        key={index}
        style={[
          styles.buttonContainer,
          {
            transform: [
              { translateX },
              { translateY },
              { scale },
            ],
            opacity,
          },
        ]}
      >
        <Animated.View
          style={[
            tooltipStyle,
            {
              opacity: activeTooltip === index ? 1 : 0,
            },
          ]}
        >
          <Text style={styles.tooltipText}>{button.tooltip}</Text>
        </Animated.View>
        <TouchableOpacity
          style={[
            styles.fab,
            button.style,
            button.color && { backgroundColor: button.color },
          ]}
          onPress={() => {
            button.onPress();
            if (button.closeOnPress !== false) {
              toggleMenu();
            }
          }}
          onLongPress={() => setActiveTooltip(index)}
          onPressOut={() => setActiveTooltip(null)}
          disabled={button.disabled}
        >
          <MaterialIcons 
            name={button.icon} 
            size={24} 
            color={button.iconColor || COLORS.background} 
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[
      styles.container,
      position === 'left' && styles.containerLeft,
      style
    ]}>
      {buttons.slice(1).map((button, index) => renderButton(button, index))}
      <TouchableOpacity
        style={[
          styles.fab,
          styles.mainButton,
          buttons[0].style,
          buttons[0].color && { backgroundColor: buttons[0].color },
        ]}
        onPress={toggleMenu}
        onLongPress={() => setActiveTooltip('main')}
        onPressOut={() => setActiveTooltip(null)}
        disabled={buttons[0].disabled}
      >
        <Animated.View
          style={{
            transform: [{
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '45deg'],
              }),
            }],
          }}
        >
          <MaterialIcons 
            name={isOpen ? 'close' : buttons[0].icon} 
            size={24} 
            color={buttons[0].iconColor || COLORS.background} 
          />
        </Animated.View>
        {activeTooltip === 'main' && (
          <View style={[
            styles.tooltipContainer,
            styles.mainTooltip,
            position === 'right' ? { right: 50 } : { left: 50 },
          ]}>
            <Text style={styles.tooltipText}>{buttons[0].tooltip}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

FloatingButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      color: PropTypes.string,
      iconColor: PropTypes.string,
      style: PropTypes.object,
      disabled: PropTypes.bool,
      closeOnPress: PropTypes.bool,
      tooltip: PropTypes.string,
    })
  ).isRequired,
  position: PropTypes.oneOf(['left', 'right']),
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    zIndex: 1000,
  },
  containerLeft: {
    right: undefined,
    left: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mainButton: {
    zIndex: 1,
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 2,
    maxWidth: 200,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mainTooltip: {
    top: '50%',
    transform: [{ translateY: -15 }],
  },
  tooltipText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FloatingButtons; 