package com.danielks.UserCrud.service;

import com.danielks.UserCrud.entity.User;
import com.danielks.UserCrud.model.UserDTO;
import com.danielks.UserCrud.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO saveUserDTO(UserDTO userDTO) {
        if (userDTO.getName() == null || userDTO.getName().isEmpty()) {
            throw new IllegalArgumentException("Nome não pode estar vazio");
        }

        if (userDTO.getPhone() == null || userDTO.getPhone().length() < 11) {
            throw new IllegalArgumentException("Número de telefone deve ter no mínimo 11 caracteres");
        }
        User user = convertToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserDTOById(UUID userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.map(this::convertToDTO).orElse(null);
    }

    public void deleteUser(UUID userId) {
        userRepository.deleteById(userId);
    }

    public UserDTO updateUserDTO(UUID userId, UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User userToUpdate = optionalUser.get();
            BeanUtils.copyProperties(convertToEntity(userDTO), userToUpdate, "id");
            User updatedUser = userRepository.save(userToUpdate);
            return convertToDTO(updatedUser);
        }
        return null;
    }

    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        return user;
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        return userDTO;
    }
}