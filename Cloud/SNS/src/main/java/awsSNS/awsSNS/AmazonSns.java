package awsSNS.awsSNS;

import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.KeyGenerator;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClient;
import com.amazonaws.services.sns.model.MessageAttributeValue;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;
import com.eatthepath.otp.TimeBasedOneTimePasswordGenerator;

public class AmazonSns 
{
	public static void main(String[] args) 
	{	
		/**
		 * Setup Aws Cli first, 
		 * 1. Install Python, then use the commands in 2, 3 & 4
		 * 2. pip3 install awscli
		 * 3. pip3 install --user --upgrade awscli
		 * 
		 * 4. now create an IAM user with SNS full access. Generate & download it's access keys 
		 * 5. Now use " aws configure --profile sns " to input the access key and secret key, 
		 * 	  region where sns is supported, then return type ( json, txt ... ) 
		 * 6. Now this code shd work 
		 */
		AmazonSNS snsClient = AmazonSNSClient
				.builder()
				.withRegion("us-east-1")
				.withCredentials(new ProfileCredentialsProvider("sns"))
				.build();

		String message 	   = "Your message";
		String phoneNumber = "919036656080";

		//<set SMS attributes>
		Map<String, MessageAttributeValue> smsAttributes = new HashMap<String, MessageAttributeValue>();
		smsAttributes.put("AWS.SNS.SMS.SenderID", new MessageAttributeValue()
				.withStringValue("SenderName") 	//The sender ID shown on the device.
				.withDataType("String"));
		smsAttributes.put("AWS.SNS.SMS.SMSType", new MessageAttributeValue()
				.withStringValue("Transactional") //Sets the type to promotional/Transactional
				.withDataType("String"));

		sendSMSMessage(snsClient, message, phoneNumber, smsAttributes);
	}

	public static void sendSMSMessage(AmazonSNS snsClient, String message, String phoneNumber, Map<String, MessageAttributeValue> smsAttributes) 
	{		
		try {
			String otp = AmazonSns.genCode();
			PublishResult result = snsClient.publish(new PublishRequest()
					.withMessage(("Your otp for is ").concat(otp))
					.withPhoneNumber(phoneNumber)
					.withMessageAttributes(smsAttributes));
			System.out.println(result); 		// Prints the message ID.
			System.out.println("Your otp for InteropX is "+otp);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}

	public static String genCode() throws NoSuchAlgorithmException, InvalidKeyException
	{
		final TimeBasedOneTimePasswordGenerator totp = new TimeBasedOneTimePasswordGenerator();

		final Key key;
		{
			final KeyGenerator keyGenerator = KeyGenerator.getInstance(totp.getAlgorithm());
			keyGenerator.init(512);
			key = keyGenerator.generateKey();
		}
		final Instant now = Instant.now();
		System.out.println(key);

		return String.format("%06d", totp.generateOneTimePassword(key, now));
	}
}
